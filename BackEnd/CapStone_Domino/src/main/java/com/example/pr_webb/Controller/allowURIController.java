package com.example.pr_webb.Controller;

import com.example.pr_webb.Repository.APIUserRepository;
import com.example.pr_webb.domain.APIUser;
import com.example.pr_webb.dto.APIAuthCodeDTO;
import com.example.pr_webb.service.APILoginService;
import com.example.pr_webb.util.JWTUtil;
import com.google.gson.Gson;
import com.nimbusds.oauth2.sdk.TokenResponse;
import java.util.HashMap;
import java.util.Optional;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;


@RestController
@Log4j2
@RequestMapping(value = "/auth",produces = "application/json")
public class allowURIController {
    @Autowired
    private final JWTUtil jwtUtil = new JWTUtil();
    @Autowired
    private APIUserRepository apiUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    APILoginService apiLoginService;

    public allowURIController(APILoginService apiLoginService) {
        this.apiLoginService = apiLoginService;
    }

    @PostMapping("/code/{registrationId}/callback")
    public ResponseEntity<String> googleLogin(@RequestBody APIAuthCodeDTO code, @PathVariable String registrationId) {
        Map<String ,String> userInfo;
        // code값으 DTO를 거치지 않으면 JSON형태의 문자열로 들어오게 된다.
        userInfo = apiLoginService.socialLogin(code.getCode(), registrationId);

        // 회원가입된 소셜계정인지 확인
        String id = userInfo.get("email");
        Optional<APIUser> user = apiUserRepository.findByMid(id);

        if (!user.isPresent()) { //유저가 존재하는 않는 경우
            String rawPassword = "비밀번호";
            String encodePassword = passwordEncoder.encode(rawPassword);
            APIUser apiUser = new APIUser(id,encodePassword);
            apiUserRepository.save(apiUser);
        }
        String accessToken = jwtUtil.generateToken(Map.of("mid", id), 1);
        String refreshToken = jwtUtil.generateToken(Map.of("mid", id),30);

        Gson gson = new Gson();

        Map<String ,Object> keyMap = Map.of(
                "accessToken" , accessToken,
                "refreshToken" , refreshToken,
                "name", userInfo.get("nickname"),
                "profile", userInfo.get("profile"));


        String jsonStr = gson.toJson(keyMap);

        return ResponseEntity.ok(jsonStr);
    }
}



