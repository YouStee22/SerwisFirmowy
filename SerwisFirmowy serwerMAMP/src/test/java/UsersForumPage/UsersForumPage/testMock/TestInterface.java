package UsersForumPage.UsersForumPage.testMock;

import UsersForumPage.UsersForumPage.controller.ForumController;
import UsersForumPage.UsersForumPage.repository.RepositoryUser;
import UsersForumPage.UsersForumPage.use.UserForum;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static UsersForumPage.UsersForumPage.controller.ForumController.generateUsersForum;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.*;

public class TestInterface {

    private RepositoryUser repositoryUser;
    private ForumController forumController;

    @Before
    public void beforeTest() {
        repositoryUser = mock(RepositoryUser.class);
        forumController = new ForumController(repositoryUser);
    }

    @Test
    public void testGetShowUsers() {
        //Given
        List<UserForum> usersToGet = generateUsersForum(1);
        System.out.println(usersToGet);
        when(repositoryUser.findAll()).thenReturn(usersToGet);
        //When
        List<UserForum> result = forumController.showAllUsers();
        //Then
        Assert.assertEquals(1, result.size());
    }

    @Test
    public void testGetShowUsers1() {
        //Given
        List<UserForum> list = generateUsersForum(10);
        when(repositoryUser.findAll()).thenReturn(list);
        //When
        List<UserForum> result = forumController.showAllUsers();
        //Then
        Assert.assertEquals(10, result.size());
    }

    @Test
    public void testAddStudent() {
        //Given
        UserForum userForum = new UserForum();
        //When
        forumController.addStudent(userForum);
        //Then
        verify(repositoryUser, times(1)).save(userForum);
    }

    @Test
    public void testDeleteStudent() {
        //Given
        UserForum userForum = new UserForum();
        //when
        repositoryUser.save(userForum);
        doNothing().when(repositoryUser).deleteById(0);
        forumController.deleteUser(0);
        //Then
        verify(repositoryUser, times(1)).deleteById(0);
    }


    @Test
    public void testUpdateStudent() {
        //Given
        UserForum userForum = new UserForum();
        when(repositoryUser.save(userForum)).thenReturn(userForum);
        //When
        UserForum result = forumController.updateStudent(userForum);
        //Then
        Assert.assertEquals(userForum, result);
    }

    @Test
    public void testShowSingleUser() {
        //Given
        UserForum userForum = new UserForum();
        when(repositoryUser.findById(1)).thenReturn(Optional.of(userForum));
        //When
        Optional<UserForum> result = forumController.showSingleUser(1);
        //Then
        Assert.assertEquals(Optional.of(userForum), result);
    }

    @Test
    public void testDeleteUser() {
        //Given
        doNothing().when(repositoryUser).deleteById(0);
        //When
        repositoryUser.deleteById(0);
        //Then
        verify(repositoryUser, times(1)).deleteById(0);
    }

    @Test
    public void testAddUser() {
        //Given
        UserForum us1 = new UserForum();
        doNothing().when(repositoryUser).delete(us1);
        //When
        repositoryUser.delete(us1);
        //Then
        verify(repositoryUser, times(1)).delete(us1);
    }
}
