package com.example.demo.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntryInfo {
    private String login;
    private String title;
    private String singer;
    private String category;
    private String yearOfProduction;
    private String description;
    private String songTrack;
    private String vinylVersions;

    public EntryInfo() {
    }

    public EntryInfo(String login, String title, String singer, String category, String yearOfProduction, String description, String songTrack, String vinylVersions) {
        this.login = login;
        this.title = title;
        this.singer = singer;
        this.category = category;
        this.yearOfProduction = yearOfProduction;
        this.description = description;
        this.songTrack = songTrack;
        this.vinylVersions = vinylVersions;
    }
}
