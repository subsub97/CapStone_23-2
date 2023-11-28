package ac.hufs.springbootdeveloper.Controller;

import ac.hufs.springbootdeveloper.Service.UserService;
import ac.hufs.springbootdeveloper.dto.AddUserRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@Controller

public class UserApiController {

    private final UserService userService;

    @PostMapping("/user")
    public ResponseEntity<Void> signup(@RequestBody AddUserRequest request) {
        userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .build();

    }
}
