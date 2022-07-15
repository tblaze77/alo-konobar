package com.example.ekonobarserver.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

/**
 * This class extends OncePerRequestFilter to determine whether a user is allowed to access certain endpoint
 * Filter intercepts API request and does further checking
 */
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //If endpoint is login path then there is no checking to do, checking is passed to another filter in filter chain
        if(request.getServletPath().equals("/login")){
            filterChain.doFilter(request,response);
        }else {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if(authorizationHeader!= null && authorizationHeader.startsWith("Bearer ")){
                try {

                    String token = authorizationHeader.substring("Bearer ".length());
                    Algorithm algorithm = Algorithm.HMAC256("ewaiter".getBytes(StandardCharsets.UTF_8));
                    //building verifier to check if token belongs to logged in user
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    for (String role: roles
                         ) {
                        authorities.add(new SimpleGrantedAuthority(role));
                    }
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request,response);
                }catch (Exception e){
                    response.setHeader("error", e.getMessage());
                    //response.sendError(FORBIDDEN.value());
                    response.setStatus(FORBIDDEN.value());
                    Map<String,String> error = new HashMap<>();
                    error.put("error_message",e.getMessage());

                    response.setContentType("application/json");
                    new ObjectMapper().writeValue(response.getOutputStream(), error);

                }

            }else {
                    filterChain.doFilter(request,response);
            }
        }


    }
}
