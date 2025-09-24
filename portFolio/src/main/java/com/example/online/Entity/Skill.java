package com.example.online.Entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String iconUrl; // or imageUrl

    @Column(nullable = false)
    private String title;

    private Integer percentage; // 0–100 (nullable if category = certification)

    @Column(nullable = false)
    private String category; // "skills" or "certifications"

    // Certification ku extra link field (resume style)
    private String certificationLink;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getPercentage() {
		return percentage;
	}

	public void setPercentage(Integer percentage) {
		this.percentage = percentage;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCertificationLink() {
		return certificationLink;
	}

	public void setCertificationLink(String certificationLink) {
		this.certificationLink = certificationLink;
	}
    
    
}
