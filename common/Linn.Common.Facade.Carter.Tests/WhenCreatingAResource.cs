namespace Linn.Common.Facade.Carter.Tests
{
    using System.Linq;
    using System.Net.Http;
    using System.Text;
    using FluentAssertions;
    using Linn.Common.Facade.Carter.Tests.Extensions;
    using Linn.Common.Facade.Carter.Tests.Fake.Resources;
    using Newtonsoft.Json;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenCreatingAResource : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var widgetResource = new WidgetResource { Id = 1, WidgetName = "Widget 1" };
            var json = JsonConvert.SerializeObject(widgetResource);

            this.WidgetService.CreateWidget(Arg.Any<WidgetResource>()).Returns(new CreatedResult<WidgetResource>(widgetResource));

            this.Client.Accept("application/json");
            this.Response = this.Client.PostAsync("/widgets", new StringContent(json, Encoding.UTF8, "application/json")).Result;
        }

        [Test]
        public void ShouldReturnCreated()
        {
            this.Response.StatusCode.Should().Be(201);
        }

        [Test]
        public void ShouldReturnLocation()
        {
            var locationHeader = this.Response.Headers.FirstOrDefault(h => h.Key == "Location");
            locationHeader.Should().NotBeNull();
            locationHeader.Value.First().Should().Be("/widgets/1");
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