package com.miliproject.springboot.service;



import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Service
public class MarketDataService {

    private static final String API_URL = "https://api.example.com/stock?symbol=";

    public double getStockPrice(String symbol) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(API_URL + symbol, String.class);
            
            JSONObject json = new JSONObject(response);
            return json.getDouble("price"); // API response অনুযায়ী key বদলাতে হবে
        } catch (Exception e) {
            e.printStackTrace();
            return 0.0;
        }
    }
}
