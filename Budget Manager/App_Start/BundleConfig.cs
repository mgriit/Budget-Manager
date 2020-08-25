using System.Web;
using System.Web.Optimization;

namespace Budget_Manager
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/font-awesome.css",
                      "~/Content/rdash.css",
                      "~/Content/site.css"));

                  bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                   "~/Scripts/angular.js",
                   "~/Scripts/angular-ui-router.js",
                   "~/Scripts/angular-cookies.js",
                   "~/Scripts/angular-animate.js",
                   "~/Scripts/angular-touch.js",
                   "~/Scripts/angular-sanitize.js",
                   "~/Scripts/ui-bootstrap-tpls-2.5.0.min.js",
                   "~/Scripts/angular-local-storage.min.js",
                   "~/Scripts/angular-chart.min.js",
                   "~/App/app.js"));
        }
    }
}
