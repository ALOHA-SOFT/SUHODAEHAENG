package com.aloha.form.service.users;

import org.springframework.stereotype.Service;
import com.aloha.form.domain.users.UserAuth;
import com.aloha.form.mapper.users.UserAuthMapper;
import com.aloha.form.service.BaseServiceImpl;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserAuthServiceImpl extends BaseServiceImpl<UserAuth, UserAuthMapper> implements UserAuthService {

}
