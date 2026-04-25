package com.aloha.form.service.common;

import java.util.List;

import com.aloha.form.domain.common.Popups;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.service.BaseService;
import com.github.pagehelper.PageInfo;

public interface PopupService extends BaseService<Popups> {
  
    PageInfo<Popups> page(QueryParams queryParams);
  
    List<Popups> listByType(String type);
    List<Popups> listByTypeOpen(String type);

    boolean delete(Long no);                                      // no(PK) 삭제
    boolean deleteById(String id);                                // id(PK) 삭제
}
