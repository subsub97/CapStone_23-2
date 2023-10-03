package ac.hufs.springbootdeveloper.config;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "Test",
                description = "Test api명세",
                version = "v1"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {
//    @Bean
//    public GroupedOpenApi chatOpenApi() {
//        String[] paths = {"/test"};
//
//        return GroupedOpenApi.builder()
//                .group("ac.hufs")
//                .pathsToMatch(paths)
//                .build();
//    }
}