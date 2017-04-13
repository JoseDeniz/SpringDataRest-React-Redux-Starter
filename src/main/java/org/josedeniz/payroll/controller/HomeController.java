package org.josedeniz.payroll.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping(value = "/", produces = "text/html")
    public String index() {
        return "index";
    }

}
