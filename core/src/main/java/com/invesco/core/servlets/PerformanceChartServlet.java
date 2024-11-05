package com.invesco.core.servlets;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import org.json.JSONObject;

@Component(service = Servlet.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Performance Chart Data Servlet",
                "sling.servlet.methods=" + "GET",
                "sling.servlet.paths=" + "/bin/invesco/performancechart"
        })
public class PerformanceChartServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(PerformanceChartServlet.class);

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            // Replace with actual data fetching logic (e.g., from an API or AEM resources)
            JSONObject data = fetchDataForChart();

            response.getWriter().write(data.toString());
        } catch (Exception e) {
            LOG.error("Error fetching performance chart data", e);
            response.setStatus(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Data retrieval failed\"}");
        }
    }

    private JSONObject fetchDataForChart() {
        // Sample data structure; replace with actual data fetching logic
        JSONObject data = new JSONObject();
        data.put("name", "Fund Performance");
        data.put("data", new int[] {5, 10, 15, 20, 25});
        return data;
    }
}
