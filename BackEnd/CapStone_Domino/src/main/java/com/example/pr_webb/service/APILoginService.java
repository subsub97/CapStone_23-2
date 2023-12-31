package com.example.pr_webb.service;

import com.example.pr_webb.config.interceptor.LoggingRequestInterceptor;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@Service
@Log4j2
public class APILoginService {

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();

    public APILoginService(Environment env) {
        this.env = env;
    }

    public Map<String, String> socialLogin(String code, String registrationId) {
        log.info("SocialLogin code ---->" + code);
        String accessToken = getAccessToken(code, registrationId);
        log.info("AccessToken issued by Google ---->" + accessToken);
        JsonNode userResourceNode = getUserResource(accessToken, registrationId);
        System.out.println("userResourceNode = " + userResourceNode);

        Map<String, String> userDetails = new HashMap<>();

        if (userResourceNode != null) {
            userDetails.put("id", userResourceNode.has("sub") ? userResourceNode.get("sub").asText() : "None");
            userDetails.put("email", userResourceNode.has("email") ? userResourceNode.get("email").asText() : "None");
            userDetails.put("nickname", userResourceNode.has("name") ? userResourceNode.get("name").asText() : "None");
            userDetails.put("profile", userResourceNode.has("picture") ? userResourceNode.get("picture").asText() : "None");
        } else {
            userDetails.put("id", "None");
            userDetails.put("email", "None");
            userDetails.put("nickname", "None");
        }

        return userDetails;
    }

    private String getAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("spring.security.oauth2.client.registration." + registrationId + ".client-id");
        String clientSecret = env.getProperty("spring.security.oauth2.client.registration." + registrationId + ".client-secret");
        String tokenUri = env.getProperty("spring.security.oauth2.client.provider." + registrationId + ".token-uri");

        MultiValueMap<String ,String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", "postmessage");
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params,headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }

    private JsonNode getUserResource(String accessToken, String registrationId) {
        String resourceUri = "https://www.googleapis.com/oauth2/v3/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }
}
