
package com.a_hub.dto.request;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class UpdateRequest {
    @Email
    private String email;

    @NotBlank
    private String department;
}

