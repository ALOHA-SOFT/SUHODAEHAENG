package com.aloha.form.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import com.aloha.form.domain.Sample;
import com.aloha.form.domain.common.Pagination;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.service.sample.SampleService;
import com.github.pagehelper.PageInfo;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
@RequestMapping("/sample")
public class SampleController {

  @Autowired private SampleService sampleService;

  /**
   * 💻 샘플 리스트
   * @return
   */
  @GetMapping("")
  public String list(
    QueryParams queryParams,
    Pagination pagination, 
    HttpServletRequest request,
    Model model,
    @RequestParam(value = "page", defaultValue = "1") int page,
    @RequestParam(value = "size", defaultValue = "10") int size
  ) {
    // 리스트
    PageInfo<Sample> pageInfo = sampleService.page(page, size);
    model.addAttribute("pageInfo", pageInfo);

    // 페이지네이션
    Long total = pageInfo.getTotal();
    pagination.setPage(queryParams.getPage());
    pagination.setSize(queryParams.getSize());
    pagination.setTotal(total);
    model.addAttribute("pagination", pagination);

    // 페이지 URI
    String path = request.getServletPath();
    String pageUri = UriComponentsBuilder.fromPath(path)
                                          .queryParam("search", queryParams.getSearch())
                                          .queryParam("size", pagination.getSize())
                                          .build()
                                          .toUriString();
    model.addAttribute("pageUri", pageUri);
    return "page/sample/list";
  }


  /**
   * 💻 샘플 등록
   * @return
   */
  @GetMapping("/create")
  public String create(

  ) {
      return "page/sample/create";
  }


  /**
   * 💻 샘플 수정
   * @return
   */
  @GetMapping("/update/{id}")
  public String update(
    Model model,
    @PathVariable("id") String id
  ) {
    Sample sample = sampleService.selectById(id);
    model.addAttribute("sample", sample);
    return "page/sample/update";
  }
  
  
}
