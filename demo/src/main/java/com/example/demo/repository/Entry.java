package com.example.demo.repository;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "entries")
public class Entry {

    @javax.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id",unique=true, nullable = false)
    private Integer id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userEntry;

    private String title;
    private String singer;
    private String category;
    private String yearofproduction;
    private String description;
    private String songtrack;
    private String vinylversions;
    private String filename;

    public Entry(User userEntry, String title, String singer, String category, String yearOfProduction, String description, String songTrack, String vinylVersions,String filename) {
        this.userEntry = userEntry;
        this.title = title;
        this.singer = singer;
        this.category = category;
        this.yearofproduction = yearOfProduction;
        this.description = description;
        this.songtrack = songTrack;
        this.vinylversions = vinylVersions;
        this.filename = filename;
    }

    public Entry() {

    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Entry other = (Entry) obj;
        return Objects.equals(this.id, other.id);
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }


}
