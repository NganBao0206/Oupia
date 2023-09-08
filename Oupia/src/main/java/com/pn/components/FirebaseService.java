/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.components;

/**
 *
 * @author yuu
 */
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import java.io.ByteArrayInputStream;

import java.io.IOException;
import java.io.InputStream;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class FirebaseService {

    public FirebaseService() throws IOException {
        String json = "{\n"
                + "  \"type\": \"service_account\",\n"
                + "  \"project_id\": \"oupia-aed75\",\n"
                + "  \"private_key_id\": \"61a1fe2e05bd6e1e11b9c4feb8e487b3d11990b0\",\n"
                + "  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAC3Kebmu2oSiT\\nsDroyPNX/fOapxB/nbkdrWSbnWvtd/7Judmn7GhLn/SCcM3/OIVwIOkI0+iWYd+s\\nLxVRNyFYgLbbMd8k1de3WAmbaU3NqScKHJuLfuR0l9mnaBSeEN5pXW2iwzw5mZva\\nW7RRn6yfrYc2kYYO9DwLxuPAngH08rfZ51QpTc0keh6ziszqG2deykHaa0tmEi4U\\nO+nS6UUFnlBIFZUdiIczGDzbhGuBT6S1npxIuLFKPas5eNdW+iSVbXrgFFWGksZT\\nu3OxG89qlw0FKpVUOthfla2GxDaOTBz55E+klvYa1J2LjLGyuxWMlXdwt/hzcJ7Y\\nfxqIcjq3AgMBAAECggEACCit8tXHHrtKQYgHRxRU5LdsNFuGEGq16CReaPWvSNrE\\nInOr/LET0Nt+JFXAv4Fgh4SABTkXh950Bb+UVl7f73+8a3CUrEVBHml1/9PH+evs\\n6PmRKpDpozU/8ORNNLy+7j2jAEfu7mJWMQwCi6s1RscB2EtZ2Jdli6yKyLt0L6Dw\\nKta3Jvf/CVdKepiq7CP5Ma7LvGHwAATyV7VoS8P+L1RMobRGTQW6q+UHcKSBWDXh\\n4I8nFR58zEmYm153ZTXPuhRxL3/cH0CV69SKEJkUAbkiVppa6bcdGcBi9uSFx9an\\nFodPebZM89vMCUnfxMhK4MjgKrFA6NZbSIV0DEHcGQKBgQDkYk63mHxQZrci5Nzm\\nfnXRYeSxrnoqnidHwHoMl4WQ24s61olNZTwQT4jApaX7BewMDzaRaix6SLBCcx9u\\nY4Gv/45mlpKCkV5SWkUnjMYGshtZbYofiXlKMKBIoQYm5rSODV+b6g5YAJUr5WY8\\n+bLjUgMfGwsQHOJifa7SY3ezmQKBgQDXRD83FEjlBVZuvRhlsFRXRINPWmBKQsmS\\nzytVNlx0NLt5S2ZX8sW65dTalZ/hvL/oyOH5k8W3E8ttFLvsEyBS1WOlv4Nil4EC\\nFPKkonzXbCEJ+sVPU0gMv2nELle61KHj7+lHhH25t5P6U0VVr7sYcyPS0P0vDZw6\\nTnGZwMlSzwKBgQCxUjLUEazTsCyZByEMRTus6ljqLBHmbQ0KhMM+a5bktdEQSeop\\nEWTlNRt0mCibEioH4vf3R3xpJW7U6RWKW/AhekZSGK6AeeXGAxiWcJKAOGFLueT4\\nP4DQvZh1S7C/G3ksoe2N3NhuM2Wew2nyBd2C6fZKfHDGfea3meXWrCwQYQKBgD7O\\nUadPSslPGl2q3CBnJuRjP/B6DNf9znP/78On3ael7wC/p/eHBHu4LLctqn0hJdjU\\nK2I25Bu7McH8p6uEFQ015yHn03yDeYdS90xjgAsWKDmSKdkwEjht7HzpjH0dJrKr\\nP6O3GzuBPTJu8y7B29ORXGVYxlXhIbC9TFWwssxvAoGBAN/41sOn3M/lzFXpA/ri\\nTOCa6Q/SqWB3TQgEgXSTkrmLT10TqNWnZ9Pu/cciExJBhSgSBq4ErBqrlMDDuVMk\\ncyIUiPjj/Je65B5V0ITq4iLua4MzHjn//B0Cg6tG8N+D3IJaVPeusdNzn4UCNmJF\\nWcCCiWhjDKj6P59om6PI1t/2\\n-----END PRIVATE KEY-----\\n\",\n"
                + "  \"client_email\": \"firebase-adminsdk-odkk7@oupia-aed75.iam.gserviceaccount.com\",\n"
                + "  \"client_id\": \"110521010478531643612\",\n"
                + "  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n"
                + "  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n"
                + "  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n"
                + "  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-odkk7%40oupia-aed75.iam.gserviceaccount.com\",\n"
                + "  \"universe_domain\": \"googleapis.com\"\n"
                + "}\n"
                + "";
        InputStream inputStream = new ByteArrayInputStream(json.getBytes());
        GoogleCredentials credentials = GoogleCredentials.fromStream(inputStream);
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(credentials)
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

    public String createCustomToken(String username) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().createCustomToken(username);
    }
}
