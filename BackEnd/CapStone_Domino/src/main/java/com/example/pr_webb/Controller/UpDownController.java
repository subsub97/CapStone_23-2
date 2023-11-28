package com.example.pr_webb.Controller;

import io.swagger.annotations.ApiOperation;
import com.example.pr_webb.dto.UploadFileDTO;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class UpDownController {

    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    @ApiOperation(value = "Upload POST", notes = "POST 방식으로 파일 등록")
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

    public String upload(UploadFileDTO uploadFileDTO) {

        log.info("uploadFileDTO --->" + uploadFileDTO);

        if (uploadFileDTO.getFiles() != null) {

            uploadFileDTO.getFiles().forEach(multipartFile -> {

                String originalName = multipartFile.getOriginalFilename();

                log.info("originalName: " + originalName);

                String uuid = UUID.randomUUID().toString();

                Path savePath = Paths.get(uploadPath, uuid+"_" + originalName);

                try {
                    multipartFile.transferTo(savePath);
                } catch (IOException e) {
                    e.printStackTrace();
                }

            });

        }

        return null;
    }
}
