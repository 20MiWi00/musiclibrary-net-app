package com.example.demo.repository;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User implements Serializable {

    @javax.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id",unique=true, nullable = false)
    private Integer id;
    @NonNull
    @Column(unique=true)
    private String login;
    private String password;
    private String name;
    private String surname;
    @NonNull
    @Column(unique = true)
    private String email;
    private String role;

    @JsonManagedReference
    @OneToMany(mappedBy = "userEntry", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Entry> entries;

    public User(){}

    public User(String login,String password, String name,String surname,String mail){
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname  = surname;
        this.email = mail;
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
        final User other = (User) obj;
        if (!Objects.equals(this.login,other.login)) {
            return false;
        }
        if (!Objects.equals(this.email, other.email)) {
            return false;
        }
        return Objects.equals(this.id, other.id);
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void hashPassword() {
        BCryptPasswordEncoder b = new BCryptPasswordEncoder();
        setPassword(b.encode(password));
    }
}
