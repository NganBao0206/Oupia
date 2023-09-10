/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.configs;

import com.github.slugify.Slugify;
import com.pn.formatters.MotelFormatter;
import com.pn.formatters.PostFormatter;
import com.pn.formatters.UserFormatter;
import com.pn.service.UserService;
import com.pn.validator.ConfirmPasswordValidator;
import com.pn.validator.ImagesValidator;
import com.pn.validator.MaxMinPeopleValidator;
import com.pn.validator.PasswordValidator;
import com.pn.validator.UsernameValidator;
import com.pn.validator.WebAppValidator;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.format.FormatterRegistry;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 *
 * @author yuumm
 */
@Configuration
@EnableWebMvc
@EnableTransactionManagement
@ComponentScan({
    "com.pn.controllers",
    "com.pn.repository",
    "com.pn.service",
    "com.pn.formatters",
    "com.pn.utils",
    "com.pn.validator",})
@PropertySource("classpath:configs.properties")
public class WebApplicationContextConfig implements WebMvcConfigurer {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**")
                .addResourceLocations("/resources/css/");
        registry.addResourceHandler("/img/**")
                .addResourceLocations("/resources/images/");
        registry.addResourceHandler("/js/**")
                .addResourceLocations("/resources/js/");
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new UserFormatter());
        registry.addFormatter(new MotelFormatter());
        registry.addFormatter(new PostFormatter());
    }

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setDefaultEncoding("UTF-8");
        return resolver;
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource m = new ResourceBundleMessageSource();
        m.setBasenames("messages");

        return m;
    }
    
    @Bean
    public ResourceLoader resourceLoader() {
        return new DefaultResourceLoader();
    }

    @Bean(name = "validator")
    public LocalValidatorFactoryBean validator() {
        LocalValidatorFactoryBean bean
                = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(messageSource());
        return bean;
    }

    @Override
    public Validator getValidator() {
        return validator();
    }

    @Bean
    public WebAppValidator userValidator(UserService userService) {
        Set<Validator> springValidators = new HashSet<>();
        springValidators.add(new ConfirmPasswordValidator());
        springValidators.add(new UsernameValidator(userService));
        springValidators.add(new PasswordValidator());
        WebAppValidator validator = new WebAppValidator();
        validator.setSpringValidators(springValidators);
        return validator;
    }

    @Bean
    WebAppValidator postRentValidator() {
        Set<Validator> springValidators = new HashSet<>();
        springValidators.add(new MaxMinPeopleValidator());
        springValidators.add(new ImagesValidator());
        WebAppValidator validator = new WebAppValidator();
        validator.setSpringValidators(springValidators);
        return validator;
    }

    @Bean
    WebAppValidator postValidator() {
        Set<Validator> springValidators = new HashSet<>();
        WebAppValidator validator = new WebAppValidator();
        validator.setSpringValidators(springValidators);
        return validator;
    }

    @Bean
    WebAppValidator motelValidator() {
        Set<Validator> springValidators = new HashSet<>();
        WebAppValidator validator = new WebAppValidator();
        validator.setSpringValidators(springValidators);
        return validator;
    }

    @Bean
    WebAppValidator postFindValidator() {
        Set<Validator> springValidators = new HashSet<>();
        WebAppValidator validator = new WebAppValidator();
        validator.setSpringValidators(springValidators);
        return validator;
    }

    @Bean
    public Slugify slugify() {
        return new Slugify();
    }

}
