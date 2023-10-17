package ac.hufs.springbootdeveloper.Service;

import ac.hufs.springbootdeveloper.domain.User;
import ac.hufs.springbootdeveloper.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service

public class UserDetailService implements UserDetailsService {

     private final UserRepository userRepository;
        @Override
        public User loadUserByUsername(String email) {
            return userRepository.findByEmail(email)
                    .orElseThrow(()-> new IllegalArgumentException((email)));
        }
}

