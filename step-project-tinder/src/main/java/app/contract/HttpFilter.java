package app.contract;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface HttpFilter extends Filter {

  default void init(FilterConfig filterConfig) {}

  default boolean isHttp(ServletRequest rq, ServletResponse rs) {
    return rq instanceof HttpServletRequest && rs instanceof HttpServletResponse;
  }

  default void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    if (isHttp(request, response)) {
      HttpServletRequest rq = (HttpServletRequest) request;
      HttpServletResponse rs = (HttpServletResponse) response;
      doHttpFilter(rq, rs, chain);
    } else chain.doFilter(request, response);
  }

  void doHttpFilter(HttpServletRequest rq, HttpServletResponse rs, FilterChain chain) throws IOException, ServletException;

  default void destroy() {}
}
