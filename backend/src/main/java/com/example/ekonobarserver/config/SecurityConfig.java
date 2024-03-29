package com.example.ekonobarserver.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    //We have to override spring security user information for storing credentials with employee
    private final UserDetailsService userDetailsService;
    //Inject password encoder
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers(HttpMethod.POST,"/v1/api/employee/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/v1/api/employee/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/v1/api/branchTable/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/v1/api/product/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/v1/api/category/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/v1/api/branch/byBranchTable/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/ws/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/v1/api/role/**").hasAnyAuthority("SUPER_USER");
        http.authorizeRequests().antMatchers(HttpMethod.PATCH, "/v1/api/order/**").hasAnyAuthority("ADMIN");
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
        //Pre validate every request
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);


    }
    //instantiate authentication manager bean to send it to filter
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
