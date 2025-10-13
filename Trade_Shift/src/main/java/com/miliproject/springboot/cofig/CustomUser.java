package com.miliproject.springboot.config;  // Security configuration package

// প্রয়োজনীয় Java ও Spring Security ক্লাসগুলো import করা হয়েছে
import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.miliproject.springboot.entity.User;

/**
 * CustomUser ক্লাসটি Spring Security-এর UserDetails ইন্টারফেস implement করে।
 * এই ক্লাসটি আমাদের নিজের User entity-কে Security framework-এর compatible ফরম্যাটে রূপান্তর করে।
 */
public class CustomUser implements UserDetails {

    // আমাদের কাস্টম User entity অবজেক্ট
    private User user;

    // Constructor: একটি User অবজেক্ট নিয়ে সেটি ক্লাসে সংরক্ষণ করে
    public CustomUser(User user) {
        super();
        this.user = user;
    }

    /**
     * ব্যবহারকারীর role বা authority ফেরত দেয়।
     * এখানে আমরা User entity থেকে role নিয়ে SimpleGrantedAuthority তৈরি করছি।
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        return Arrays.asList(authority);
    }

    /**
     * ব্যবহারকারীর password ফেরত দেয়।
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * ব্যবহারকারীর username ফেরত দেয়।
     * এখানে username হিসেবে email ব্যবহার করা হয়েছে।
     */
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    /**
     * ব্যবহারকারীর account মেয়াদোত্তীর্ণ হয়েছে কিনা তা জানায়।
     * এখানে সবসময় true ফেরত দিচ্ছে মানে account সবসময় valid।
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * ব্যবহারকারীর account lock করা হয়েছে কিনা তা জানায়।
     * এখানে সবসময় true মানে account সবসময় unlocked।
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * ব্যবহারকারীর credentials মেয়াদোত্তীর্ণ হয়েছে কিনা তা জানায়।
     * এখানে সবসময় true মানে password সবসময় valid।
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * ব্যবহারকারীর account সক্রিয় আছে কিনা তা জানায়।
     * এখানে সবসময় true মানে account সবসময় enabled।
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

}
