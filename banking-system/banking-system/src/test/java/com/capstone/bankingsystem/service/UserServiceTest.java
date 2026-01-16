package com.capstone.bankingsystem.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.capstone.bankingsystem.dto.RegisterRequest;
import com.capstone.bankingsystem.model.User;
import com.capstone.bankingsystem.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void createUser_shouldEncodePasswordAndSave() {
        RegisterRequest req = new RegisterRequest();
        req.setUsername("user1");
        req.setEmail("u@test.com");
        req.setPassword("pass");

        when(passwordEncoder.encode("pass")).thenReturn("encoded");
        when(userRepository.save(any(User.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        User user = userService.createUser(req);

        assertEquals("user1", user.getUsername());
        assertEquals("encoded", user.getPassword());
        assertTrue(user.isActive());
    }

    @Test
    void updateUserStatus_shouldUpdateAndSave() {
        User user = new User();
        user.setId("1");
        user.setActive(true);

        when(userRepository.findById("1"))
                .thenReturn(Optional.of(user));
        when(userRepository.save(any()))
                .thenReturn(user);

        User updated = userService.updateUserStatus("1", false);

        assertFalse(updated.isActive());
        verify(userRepository).save(user);
    }

    @Test
    void updateUserStatus_whenUserNotFound_shouldThrowException() {
        when(userRepository.findById("99"))
                .thenReturn(Optional.empty());

        assertThrows(
                RuntimeException.class,
                () -> userService.updateUserStatus("99", true)
        );
    }
}
