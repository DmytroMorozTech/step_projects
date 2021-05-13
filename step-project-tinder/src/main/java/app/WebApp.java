package app;

import app.controller.MessagesController;
import app.controller.UsersController;
import app.db.ConnDetails;
import app.db.DbConn;
import app.db.DbSetup;
import app.service.FilterUnloggedUsers;
import app.servlets.*;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import javax.servlet.DispatcherType;
import java.sql.Connection;
import java.util.EnumSet;

public class WebApp {
    /**
     * http://localhost:8080/login
     * http://localhost:8080/logout
     * http://localhost:8080/do
     * http://localhost:8080/profiles
     * http://localhost:8080/abracadabra
     */

    public static UsersController uc;
    public static MessagesController mc;

    public static void main(String[] args) throws Exception {
        // temporary (we'll use it during development only)
        DbSetup.migrate(ConnDetails.url, ConnDetails.username, ConnDetails.password);

//        We will use this when deploying to HEROKU server.
//        DbSetup.migrate(HerokuEnv.jdbc_url(), HerokuEnv.jdbc_username(), HerokuEnv.jdbc_password());

        // temporary (we'll use it during development only)
        Connection conn = DbConn.create(ConnDetails.url, ConnDetails.username, ConnDetails.password);

//        We will use this when deploying to HEROKU server.
//        Connection conn = DbConn.createFromURL(HerokuEnv.jdbc_url());

//    Connection conn = null;

        Server server = new Server(8080);

        uc = new UsersController(conn);
        mc = new MessagesController(conn);

        FilterUnloggedUsers filterAuth = new FilterUnloggedUsers(uc);
        FilterHolder authFilter = new FilterHolder();
        authFilter.setFilter(filterAuth);

        ServletContextHandler handler = new ServletContextHandler() {{
            addServlet(new ServletHolder(new LoginServlet(uc)), "/login");
            addServlet(new ServletHolder(new ServletLogout(uc)), "/logout");
            addFilter(authFilter, "/app/*", EnumSet.of(DispatcherType.REQUEST));
            // this authFilter will filter all requests to the path "/app/*" and will either
            // allow access to resources (if user is authenticated) or redirect them to the login page.

            addServlet(new ServletHolder(new UsersServlet(uc)), "/app/users");
            addServlet(new ServletHolder(new MatchedProfilesServlet(uc)), "/app/liked");
            addServlet(new ServletHolder(new ServletDo(uc)), "/app/do");

            addServlet(new ServletHolder(new MessagesServlet(uc, mc)), "/app/messages");

            addServlet(new ServletHolder(new RedirectServlet("/app/users")), "");
            // when user opens http://localhost:8080  (root), this line will redirect them to the users page.
            // and if user doesn't have a valid cookie on his side, they will be redirected to login page.

            addServlet(new ServletHolder(new ServletError404()), "/*");
            // if user tries to access non-existent path, they will be shown error404 message.
        }};

        ContextHandler ctxHandler = new ContextHandler("/static");
        ResourceHandler resHandler = new ResourceHandler();
        resHandler.setResourceBase("static_content");
        ctxHandler.setHandler(resHandler);

        ContextHandlerCollection handlers = new ContextHandlerCollection() {{
            addHandler(handler);
            addHandler(ctxHandler);
        }};

        server.setHandler(handlers);

        server.start();
        server.join();
    }
}
