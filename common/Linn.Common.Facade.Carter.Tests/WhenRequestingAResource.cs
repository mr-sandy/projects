namespace Linn.Common.Facade.Carter.Tests
{
    using System.Linq;
    using FluentAssertions;
    using Linn.Common.Facade.Carter.Tests.Extensions;
    using Linn.Common.Facade.Carter.Tests.Fake.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenRequestingAResource : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var widgetResource = new WidgetResource { WidgetName = "Widget 1" };

            this.WidgetService.GetWidget(1).Returns(new SuccessResult<WidgetResource>(widgetResource));

            this.Client.Accept("application/json");
            this.Response = this.Client.GetAsync("/widgets/1").Result;
        }

        [Test]
        public void ShouldReturnOk()
        {
            this.Response.StatusCode.Should().Be(200);
        }

        [Test]
        public void ShouldReturnJsonContentType()
        {
            var contentTypeHeader = this.Response.Content.Headers.FirstOrDefault(h => h.Key == "Content-Type");
            contentTypeHeader.Should().NotBeNull();
            contentTypeHeader.Value.First().Should().Contain("application/json");
        }

        [Test]
        public void ShouldReturnJsonBody()
        {
            var resources = this.Response.DeserializeBody<WidgetResource>();
            resources.Should().NotBeNull();

            resources.WidgetName.Should().Be("Widget 1");
        }
    }
}
