package UsersForumPage.UsersForumPage.testMock;

import UsersForumPage.UsersForumPage.controller.ForumController;
import UsersForumPage.UsersForumPage.repository.RepositoryUser;
import UsersForumPage.UsersForumPage.use.UserForum;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

public class SecondTestToMock {

    @Test
    public void test1() {
        //Given
        List<UserForum> userForum = new ArrayList<>();
        userForum.add(new UserForum());
        //When
        RepositoryUser repositoryUser = mock(RepositoryUser.class);
        ForumController forumController = new ForumController(repositoryUser);
        when(forumController.showAllUsers()).thenReturn(userForum);
        //Then
        Assert.assertEquals(1, userForum.size());
    }

    @Test
    public void test2() {
        //Given
        RepositoryUser repositoryUser = mock(RepositoryUser.class);
        doNothing().when(repositoryUser).deleteById(0);
        //When
        repositoryUser.deleteById(0);
        //Then
        verify(repositoryUser, times(1)).deleteById(0);
    }
}
