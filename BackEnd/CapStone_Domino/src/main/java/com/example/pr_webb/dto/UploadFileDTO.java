package com.example.pr_webb.dto;

import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
@Data
public class UploadFileDTO {

    private List<MultipartFile> files;

}
