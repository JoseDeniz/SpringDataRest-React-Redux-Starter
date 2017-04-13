package org.josedeniz.payroll.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class FallbackErrorController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    @ResponseStatus(HttpStatus.OK)
    public String error() {
        return "index";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}
