package com.backend.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class CsvUtils {

    public static String writeToCsv(List<Map<String, Object>> data, String fileName) throws IOException {
        String directoryPath = "exports";
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdir(); 
        }

        String filePath = directoryPath + "/" + fileName;
        try (FileWriter writer = new FileWriter(filePath)) {
            if (!data.isEmpty()) {
                Map<String, Object> firstRow = data.get(0);
                writer.append(String.join(",", firstRow.keySet()));
                writer.append("\n");
            }

            for (Map<String, Object> row : data) {
                int columnCount = row.size();
                int currentColumn = 0;
                for (Object value : row.values()) {
                    String cellValue = value != null ? value.toString() : "";
                    writer.append("\"").append(cellValue.replace("\"", "\"\"")).append("\"");
                    if (++currentColumn < columnCount) {
                        writer.append(",");
                    }
                }
                writer.append("\n");
            }
        }
        return filePath;
    }
}