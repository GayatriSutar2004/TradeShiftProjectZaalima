package com.miliproject.springboot.service;

public class TradeStats {
    private long totalBuy;
    private long totalSell;

    public TradeStats(long totalBuy, long totalSell) {
        this.totalBuy = totalBuy;
        this.totalSell = totalSell;
    }

    public long getTotalBuy() { return totalBuy; }
    public void setTotalBuy(long totalBuy) { this.totalBuy = totalBuy; }

    public long getTotalSell() { return totalSell; }
    public void setTotalSell(long totalSell) { this.totalSell = totalSell; }
}
