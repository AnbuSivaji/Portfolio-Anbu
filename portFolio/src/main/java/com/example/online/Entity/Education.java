package com.example.online.Entity;





import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String institutionName;

    private String institutionImageUrl;

    private int startYear;

    private int endYear;

    private String description;

    // differentiate panna: school or college
    private String type;

    public Education() {}

    public Education(String institutionName, String institutionImageUrl, int startYear, int endYear, String description, String type) {
        this.institutionName = institutionName;
        this.institutionImageUrl = institutionImageUrl;
        this.startYear = startYear;
        this.endYear = endYear;
        this.description = description;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getInstitutionImageUrl() {
        return institutionImageUrl;
    }

    public void setInstitutionImageUrl(String institutionImageUrl) {
        this.institutionImageUrl = institutionImageUrl;
    }

    public int getStartYear() {
        return startYear;
    }

    public void setStartYear(int startYear) {
        this.startYear = startYear;
    }

    public int getEndYear() {
        return endYear;
    }

    public void setEndYear(int endYear) {
        this.endYear = endYear;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
