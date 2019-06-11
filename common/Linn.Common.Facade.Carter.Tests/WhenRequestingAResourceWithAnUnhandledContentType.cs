using Linn.Common.Facade.Carter.Tests.Fake.Resources;

namespace Linn.Common.Facade.Carter.Tests
{
    using FluentAssertions;
    using Linn.Common.Facade.Carter.Tests.Extensions;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenRequestingAResourceWithAnUnhandledContentType : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var widget = new WidgetResource { WidgetName = "Widget 1" };

            this.WidgetService.GetWidget(1).Returns(new SuccessResult<WidgetResource>(widget));

            this.Client.Accept("application/xml");
            this.Response = this.Client.GetAsync("/widgets/1").Result;
        }

        [Test]
        public void ShouldReturnOk()
        {
            this.Response.StatusCode.Should().Be(406);
        }
    }
}