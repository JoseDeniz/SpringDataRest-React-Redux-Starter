package org.josedeniz.payroll.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.springframework.http.MediaType.TEXT_HTML_VALUE;

@Controller
public class HomeController {

    @GetMapping(value = "/", produces = TEXT_HTML_VALUE)
    public String index() {
        return "index";
    }

}
