package com.team2.honin.honinserver.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.team2.honin.honinserver.service.S3UploadService;
import com.team2.honin.honinserver.service.SImagesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("/secondhand")
public class SImagesController {

    @Autowired
    private SImagesService sis;

    @Autowired
    private S3UploadService sus;

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // 버킷 이름을 설정 파일에서 가져옴

    @PostMapping("/uploadImages")
    public HashMap<String, Object> uploadImages(@RequestParam("image") MultipartFile file) {
        HashMap<String, Object> result = new HashMap<>();
        try {
            // 서비스단의 파일 업로드 메서드를 호출해서 파일 저장
            String uploadFilePathName = sus.saveFile(file);

            // URL 생성 로직 개선
            String fileUrl;
            if (uploadFilePathName.startsWith("https://")) {
                fileUrl = uploadFilePathName; // 이미 전체 URL인 경우 그대로 사용
            } else {
                fileUrl = amazonS3Client.getUrl(bucket, uploadFilePathName).toString();
            }
            result.put("savefilename", fileUrl);  // URL을 savefilename으로 반환
        } catch (IllegalStateException | IOException e) {
            log.error("File upload error: ", e);
            result.put("error", "파일 업로드 중 오류가 발생했습니다.");
        }
        return result;
    }
}
