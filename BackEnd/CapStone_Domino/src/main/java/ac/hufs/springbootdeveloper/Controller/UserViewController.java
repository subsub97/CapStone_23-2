package ac.hufs.springbootdeveloper.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserViewController {
    @GetMapping("/loign")
    public String login() {return "login";}
}
