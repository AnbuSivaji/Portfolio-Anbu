package com.example.online.Entity;




import jakarta.persistence.*;
import lombok.*;

import java.time.YearMonth;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String role;

    // Duration → Start & End (Month + Year)
    private YearMonth startDate;

    private YearMonth endDate;

    @Column(length = 2000)
    private String description;

    private String companyImageUrl;   // logo/icon

    private String certificateUrl;    // link for certificate

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public YearMonth getStartDate() {
		return startDate;
	}

	public void setStartDate(YearMonth startDate) {
		this.startDate = startDate;
	}

	public YearMonth getEndDate() {
		return endDate;
	}

	public void setEndDate(YearMonth endDate) {
		this.endDate = endDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCompanyImageUrl() {
		return companyImageUrl;
	}

	public void setCompanyImageUrl(String companyImageUrl) {
		this.companyImageUrl = companyImageUrl;
	}

	public String getCertificateUrl() {
		return certificateUrl;
	}

	public void setCertificateUrl(String certificateUrl) {
		this.certificateUrl = certificateUrl;
	}
    
    
}
