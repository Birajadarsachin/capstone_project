package com.capstone.bankingsystem.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
public class Client {

    @Id
    private String id;

    @NotBlank
    private String companyName;

    @NotBlank
    private String industry;

    private String address;

    @NotBlank
    private String primaryContactName;

    @Email
    @NotBlank
    private String primaryContactEmail;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String primaryContactPhone;

    @Positive
    private double annualTurnover;

    @NotNull
    private Boolean documentsSubmitted;

    // RM who created this client
    private String rmId;

    public Client() {
    }

    // getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrimaryContactName() {
        return primaryContactName;
    }

    public void setPrimaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
    }

    public String getPrimaryContactEmail() {
        return primaryContactEmail;
    }

    public void setPrimaryContactEmail(String primaryContactEmail) {
        this.primaryContactEmail = primaryContactEmail;
    }

    public String getPrimaryContactPhone() {
        return primaryContactPhone;
    }

    public void setPrimaryContactPhone(String primaryContactPhone) {
        this.primaryContactPhone = primaryContactPhone;
    }

    public double getAnnualTurnover() {
        return annualTurnover;
    }

    public void setAnnualTurnover(double annualTurnover) {
        this.annualTurnover = annualTurnover;
    }

    public Boolean getDocumentsSubmitted() {
        return documentsSubmitted;
    }

    public void setDocumentsSubmitted(Boolean documentsSubmitted) {
        this.documentsSubmitted = documentsSubmitted;
    }

    public String getRmId() {
        return rmId;
    }

    public void setRmId(String rmId) {
        this.rmId = rmId;
    }
}
