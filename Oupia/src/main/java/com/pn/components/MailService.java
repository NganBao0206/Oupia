/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.components;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import static com.pn.components.JwtService.EXPIRE_TIME;
import static com.pn.components.JwtService.SHARED_SECRET_KEY;
import com.pn.pojo.Post;
import com.pn.pojo.User;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.mail.internet.MimeMessage;
import org.apache.tiles.Definition;
import org.apache.tiles.TilesContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

/**
 *
 * @author yuu
 */
@Component
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private ThreadPoolTaskExecutor emailThreadPoolExecutor;

    private static final String SECRET_KEY = "1vZpFjM6jTcJYzLxLZ7u8fzFjM6jTcJYzLxLZ4u8f8Z";
    private static final byte[] SHARED_SECRET_KEY = SECRET_KEY.getBytes();
    private static final int EXPIRE_TIME = 360000;

    public void sendEmail(User user) {
        Runnable emailTask = () -> {
            Date expiryTime = new Date(System.currentTimeMillis() + EXPIRE_TIME);
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
            String dateString = formatter.format(expiryTime);
            String token = generateTokenEmail(user.getEmail());
            String url = "http://localhost:8080/Oupia/api/confirm-email/" + user.getUsername() + "/" + token + "/";
            try {
                String htmlMsg = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n"
                        + "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n"
                        + "    <head>\n"
                        + "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n"
                        + "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n"
                        + "        <style>\n"
                        + "            @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');\n"
                        + "            table div, h2, p, a{font-family: 'Montserrat', sans-serif}\n"
                        + "            table div, h2, p, a{color: black}\n"
                        + "            a{text-decoration: none}\n"
                        + "        </style>\n"
                        + "\n"
                        + "    </head>\n"
                        + "    <body style=\"margin:0; padding:0;\">\n"
                        + "        <table role=\"presentation\" style=\"width:100%; border-collapse:collapse; border:0; border-spacing:0; background:#ffffff;\">\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\" style=\"padding:0;\">\n"
                        + "                    <h2>Xác thực email để hoàn thành đăng ký</h2>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <div style=\"height: 1px; width: 75%; background-color: black\"></div>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <p class=\"my-3\">Cảm ơn bạn đã đăng ký tài khoản tại <strong>Oupia</strong></p>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <p class=\"col-7\">Để hoàn thành quá trình đăng ký, bạn vui lòng xác thực email của bạn bằng cách nhấn vào nút bên dưới hoặc sử dụng đường link này\n"
                        + "                        <a style=\"text-decoration-none; color: #46AAFF\" href=\"" + url + "\">" + url + "</a>\n"
                        + "                    </p>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <p class=\"col-12\"><a style=\"display: block; color: white; padding: 15px; background-color: #46AAFF; width: 30%; min-width: fit-content; border-radius: 9px\" href=\"" + url + "\">Xác thực email của tôi</a></p>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <p>Mã xác thực sẽ hết hạn vào lúc " + dateString  + "\nBạn có thể đăng nhập vào hệ thống để yêu cầu cấp thư xác thực mới</p>"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <p>Trân trọng!</p>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "        </table>\n"
                        + "    </body>\n"
                        + "</html>";
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");
                helper.setTo(user.getEmail());
                helper.setSubject("Xác thực email");
                helper.setText(htmlMsg, true);

                javaMailSender.send(mimeMessage);

                // Gửi email thành công
            } catch (Exception e) {
                // Xử lý lỗi khi gửi email không thành công
            }
        };
        emailThreadPoolExecutor.execute(emailTask);
    }

    public void sendEmailNewPost(Post post, String email) {
        Runnable emailTask = () -> {
            try {
                String url = "http://localhost:3000/posts/" + post.getSlug();
                String htmlMsg = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n"
                        + "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n"
                        + "    <head>\n"
                        + "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n"
                        + "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n"
                        + "        <style>\n"
                        + "            @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');\n"
                        + "            table div, h2, p, a{font-family: 'Montserrat', sans-serif}\n"
                        + "            table div, h2, p, a{color: black}\n"
                        + "            a{text-decoration: none}\n"
                        + "        </style>\n"
                        + "\n"
                        + "    </head>\n"
                        + "    <body style=\"margin:0; padding:0;\">\n"
                        + "        <table role=\"presentation\" style=\"width:100%; border-collapse:collapse; border:0; border-spacing:0; background:#ffffff;\">\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\" style=\"padding:0;\">\n"
                        + "                    <h2> Chủ trọ " + post.getUserId().getFullName() + " (" + post.getUserId().getUsername() + ")" + " vừa đăng bài viết mới!</h2>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\" style=\"padding:0;\">\n"
                        + "                    <h2> Tiêu đề: " + post.getTitle() + "</h2>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <p class=\"col-12\"><a style=\"display: block; color: white; padding: 15px; background-color: #46AAFF; width: 30%; min-width: fit-content; border-radius: 9px\" href=\"" + url + "\">Bấm vào đây để xem chi tiết</a></p>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <div style=\"height: 1px; width: 75%; background-color: black\"></div>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "            <tr>\n"
                        + "                <td align=\"center\">\n"
                        + "                    <p>Trân trọng!</p>\n"
                        + "                </td>\n"
                        + "            </tr>\n"
                        + "        </table>\n"
                        + "    </body>\n"
                        + "</html>";
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");
                helper.setTo(email);
                helper.setSubject("Chủ trọ " + post.getUserId().getFullName() + " (" + post.getUserId().getUsername() + ")" + " vừa đăng bài viết mới!");
                helper.setText(htmlMsg, true);

                javaMailSender.send(mimeMessage);

                // Gửi email thành công
            } catch (Exception e) {
                // Xử lý lỗi khi gửi email không thành công
            }
        };
        emailThreadPoolExecutor.execute(emailTask);
    }

    public String generateTokenEmail(String email) {
        String token = null;
        try {
            JWSSigner signer = new MACSigner(SHARED_SECRET_KEY);

            JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
            builder.claim("email", email);

            builder.expirationTime(new Date(System.currentTimeMillis() + EXPIRE_TIME));

            JWTClaimsSet claimsSet = builder.build();
            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);

            signedJWT.sign(signer);
            token = signedJWT.serialize();
        } catch (JOSEException e) {
            System.out.println(e.getMessage());
        }
        return token;
    }

    public String getEmailFromToken(String token) {
        String email = null;
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SHARED_SECRET_KEY);
            if (signedJWT.verify(verifier)) {
                JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
                email = claims.getStringClaim("email");
            }
        } catch (JOSEException | ParseException e) {
            System.err.println(e.getMessage());
        }
        return email;
    }

}
