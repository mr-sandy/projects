using Linn.Common.Facade.Carter.Tests.Fake.Resources;

namespace Linn.Common.Facade.Carter.Tests
{
    using System.Linq;
    using FluentAssertions;
    using Linn.Common.Facade.Carter.Tests.Extensions;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenRequestingAResourceThatCannotBeFound : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.WidgetService.GetWidget(999).Returns(new NotFoundResult<WidgetResource>());

            this.Client.Accept("application/json");
            this.Response = this.Client.GetAsync("/widgets/999").Result;
        }

        [Test]
        public void ShouldReturnNotFound()
        {
            this.Response.StatusCode.Should().Be(404);
        }

        [Test]
        public void ShouldReturnJsonContentType()
        {
            var contentTypeHeader = this.Response.Content.Headers.FirstOrDefault(h => h.Key == "Content-Type");
            contentTypeHeader.Should().NotBeNull();
            contentTypeHeader.Value.First().Should().Contain("application/json");
        }
    }
}
