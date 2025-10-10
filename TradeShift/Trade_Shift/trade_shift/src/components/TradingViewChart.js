import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!symbol || !containerRef.current) return;

    const containerId = `tradingview_chart_${symbol.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    // Clear previous content
    containerRef.current.innerHTML = "";

    // Create container div for the widget
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";
    widgetContainer.style.height = "100%";
    widgetContainer.style.width = "100%";

    const chartContainer = document.createElement("div");
    chartContainer.className = "tradingview-widget-container__widget";
    chartContainer.id = containerId;
    chartContainer.style.height = "calc(100% - 32px)";
    chartContainer.style.width = "100%";

    widgetContainer.appendChild(chartContainer);
    containerRef.current.appendChild(widgetContainer);

    // Create and configure the script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Set innerHTML instead of textContent for proper JSON parsing
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol.toUpperCase(),
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "light",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      container_id: containerId,
    });

    widgetContainer.appendChild(script);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      style={{ 
        height: "450px", 
        width: "100%", 
        marginTop: "15px",
        position: "relative"
      }}
    >
      {!symbol && (
        <div style={{ 
          padding: "20px", 
          textAlign: "center", 
          color: "#666" 
        }}>
          Enter a valid symbol to display chart
        </div>
      )}
    </div>
  );
};

export default TradingViewChart;