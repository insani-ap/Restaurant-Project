package com.sdlc.restaurant.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
public class OrderList {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    int id;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    List<Menu> menu;

    @ManyToOne
    User user;

    String commentTitle;
    @Column(length = 4000, columnDefinition = "TEXT")
    String commentSubTitle;

    public OrderList(int id, List<Menu> menu, User user, String commentTitle, String commentSubTitle) {
        this.id = id;
        this.menu = menu;
        this.user = user;
        this.commentTitle = commentTitle;
        this.commentSubTitle = commentSubTitle;
    }


    public OrderList() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Menu> getMenu() {
        return menu;
    }

    public void setMenu(List<Menu> menu) {
        this.menu = menu;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCommentTitle() {
        return commentTitle;
    }

    public void setCommentTitle(String commentTitle) {
        this.commentTitle = commentTitle;
    }

    public String getCommentSubTitle() {
        return commentSubTitle;
    }

    public void setCommentSubTitle(String commentSubTitle) {
        this.commentSubTitle = commentSubTitle;
    }
}
