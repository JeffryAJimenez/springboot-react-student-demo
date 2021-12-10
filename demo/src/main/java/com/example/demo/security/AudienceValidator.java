package com.example.demo.security;

import com.example.demo.auth0user.Auth0Service;
import com.example.demo.auth0user.Auth0User;
import com.example.demo.context.ContextAware;
import com.example.demo.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.Assert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.demo.utils.Constants.*;
import static com.example.demo.utils.Constants.USERNAME;

public class AudienceValidator implements OAuth2TokenValidator<Jwt> {

    private final String audience;


    AudienceValidator(String audience){
        Assert.hasText(audience, "audience is null or empty");
        this.audience = audience;
    }


    @Override
    public OAuth2TokenValidatorResult validate(Jwt jwt) {

        List<String> audience = jwt.getAudience();

        //check that it contains our audience
        if(audience.contains(this.audience)){


            Map<String, Object> claimsMap = new HashMap<String, Object>();

            for(Map.Entry<String, Object> entry : jwt.getClaims().entrySet()) {
                claimsMap.put(entry.getKey() , entry.getValue());
            }

            String id = jwt.getSubject();
            String email = (String) claimsMap.get(AUTH_0_SCOPE + EMAIL);
            String username = (String) claimsMap.get(AUTH_0_SCOPE + USERNAME);
            //check if user exists, if not add to user database

            Auth0Service auth0Service = (Auth0Service) ContextAware.getApplicationContext().getBean("auth0Service");
            boolean exists = auth0Service.userExistsByAuth0Id(id);

            if(!exists){
                //fill out info
                auth0Service.addAuth0User(new Auth0User(id, email, username));

            }

            return OAuth2TokenValidatorResult.success();
        }

        OAuth2Error err = new OAuth2Error(OAuth2ErrorCodes.INVALID_TOKEN);
        return OAuth2TokenValidatorResult.failure(err);

    }
}
