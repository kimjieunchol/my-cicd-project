package com.a_hub.util;

import com.a_hub.dto.NoticeDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class NoticeJsonReader {

    public static List<NoticeDto> readJsonFile(String filePath) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        // DTO에 없는 필드는 무시
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        return mapper.readValue(new File(filePath), new TypeReference<List<NoticeDto>>() {});
    }
}
