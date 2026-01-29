package com.aloha.form.service.sample;

import org.springframework.stereotype.Service;

import com.aloha.form.domain.Sample;
import com.aloha.form.mapper.SampleMapper;
import com.aloha.form.service.BaseServiceImpl;

import groovy.util.logging.Slf4j;

@Slf4j
@Service
public class SampleServiceImpl extends BaseServiceImpl<Sample, SampleMapper> implements SampleService {

  
}
