package stevenalexander.backend_hernandezjimenez.dto;

public class ResetPasswordRequest {
    private String token;
    private String newPassword;
    public ResetPasswordRequest() {}
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
