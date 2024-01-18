package com.project.ecommercebackend.api.controller.spotify;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

@RestController
public class SpotifyController {

    private final String clientId = ""; // write your clientId
    private final String clientSecret = ""; // write your clientSecret
    private final String redirectUri = "http://localhost:63342/ecommerce/ecommerce-frontend/index.html";

    @PostMapping("/spotify-callback")
    public SpotifyAccessTokenResponse handleSpotifyCallback(@RequestParam String code) {
        String tokenUrl = "https://accounts.spotify.com/api/token";
        String authHeader = "Basic " + Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("code", code);
        requestBody.add("redirect_uri", redirectUri);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", authHeader);
        headers.add("Content-Type", "application/x-www-form-urlencoded");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<SpotifyAccessTokenResponse> responseEntity = new RestTemplate().postForEntity(tokenUrl, requestEntity, SpotifyAccessTokenResponse.class);

        return responseEntity.getBody();
    }
}
