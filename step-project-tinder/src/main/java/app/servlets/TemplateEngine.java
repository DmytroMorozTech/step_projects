package app.servlets;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.HashMap;

/**
 * https://freemarker.apache.org/docs/ref_directives.html
 */
public class TemplateEngine {

    private final Configuration conf;

    private TemplateEngine(String fullPath) throws IOException {
        this.conf = new Configuration(Configuration.VERSION_2_3_30) {{
            setDirectoryForTemplateLoading(new File(fullPath));
            setDefaultEncoding(String.valueOf(StandardCharsets.UTF_8));
            setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
            setLogTemplateExceptions(false);
            setWrapUncheckedExceptions(true);
        }};
    }

    public static TemplateEngine folder(final String path_from_project_root) {
        try {
            return new TemplateEngine(path_from_project_root);
        } catch (IOException x) {
            throw new RuntimeException(x);
        }
    }

    public static TemplateEngine resources(final String path_from_project_resources) {
        try {
            String path = Paths
                    .get(TemplateEngine.class.getResource(path_from_project_resources).toURI())
                    .toFile().getAbsolutePath();
            return new TemplateEngine(path);
        } catch (URISyntaxException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void render(String template, HashMap<String, Object> data, HttpServletResponse resp) {
        resp.setCharacterEncoding(String.valueOf(StandardCharsets.UTF_8));

        try (PrintWriter w = resp.getWriter()) {
            conf.getTemplate(template).process(data, w);
        } catch (TemplateException | IOException e) {
            throw new RuntimeException("Freemarker error", e);
        }
    }
}
