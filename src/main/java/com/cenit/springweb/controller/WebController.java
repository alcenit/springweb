
package com.cenit.springweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/effect2")
    public String effect2() {
        return "effect2";
    }

    @GetMapping("/effect3")
    public String effect3() {
        return "effect3";
    }
}