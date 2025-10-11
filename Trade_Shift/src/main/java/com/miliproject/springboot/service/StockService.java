package com.miliproject.springboot.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {

    private static final String SEARCH_API_URL = "https://api.example.com/search?query=";

    public List<String> searchStocks(String query) {
        List<String> results = new ArrayList<>();
        try {
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(SEARCH_API_URL + query, String.class);

            JSONArray jsonArray = new JSONArray(response);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject stock = jsonArray.getJSONObject(i);
                results.add(stock.getString("symbol") + " - " + stock.getString("name"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

	public List<String> searchStocks1(String query) {
		// TODO Auto-generated method stub
		return null;
	}
}
