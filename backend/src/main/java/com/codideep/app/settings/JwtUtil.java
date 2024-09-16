package com.codideep.app.settings;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.util.Date;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;

@Service
public class JwtUtil {
    
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 86400000; // 1 día en milisegundos

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimJws = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);

            // Verificar la expiracion del token
            Date now = new Date();
            if (claimJws.getBody().getExpiration().before(now)) {
                return false;
            }
            return true;
        } catch (SignatureException ex) {
            // La firma del token es invalida
            return false;
        } catch (Exception e) {
            // Otra excepcion
            return false;
        }
    }
}
